// https://observablehq.com/@d3/zoomable-treemap
class Treemap {
  constructor({ el, data, groupedByCategory }) {
    this.el = el;
    this.data = data;
    this.groupedByCategory = groupedByCategory;
    this.resizeVis = this.resizeVis.bind(this);
    this.tile = this.tile.bind(this);
    this.render = this.render.bind(this);
    this.position = this.position.bind(this);
    this.zoomout = this.zoomout.bind(this);
    this.zoomin = this.zoomin.bind(this);
    this.initVis();
  }

  initVis() {
    this.accessor = {
      folio: (d) => d.folio,
      page: (d) => d.page,
      entry: (d) => d.entry_id,
      length: (d) => +d.length,
      wordCount: (d) => +d.wordcount,
      category: (d) => d.categories,
      percentMargin: (d) => +d["% marginal"],
      title: (d) => d.heading_tl,
      url: (d) => d.url,
    };

    this.format = d3.format(",d");

    this.height = 800;
    this.marginTop = 30;

    this.x = d3.scaleLinear();
    this.y = d3.scaleLinear().rangeRound([0, this.height]);
    this.rootColor = "#fff";
    this.color = d3
      .scaleOrdinal()
      .domain([
        "animal husbandry",
        "arms and armor",
        "casting",
        "corrosives",
        "cultivation",
        "decorative",
        "dyeing",
        "glass process",
        "household and daily life",
        "La boutique",
        "lists",
        "manuscript structure",
        "medicine",
        "merchants",
        "metal process",
        "painting",
        "practical optics",
        "preserving",
        "printing",
        "stones",
        "tool",
        "tricks and sleight of hand",
        "varnish",
        "wax process",
        "wood and its coloring",
      ])
      .range([
        "#85dfb1",
        "#f5929c",
        "#43cec1",
        "#f29b82",
        "#0cc8e1",
        "#f0b67d",
        "#c1adf5",
        "#f8f9aa",
        "#80b0de",
        "#b8e7a2",
        "#f8d0ff",
        "#9db470",
        "#bccdff",
        "#b8ac74",
        "#ffb6d5",
        "#94ffe0",
        "#d5a081",
        "#b9ffe6",
        "#ffc59d",
        "#69b7c4",
        "#ffd0ca",
        "#78b8a7",
        "#d4adaa",
        "#e4ffe6",
        "#e5fbe1",
      ]);

    this.container = d3.select(this.el).classed("vis-treemap", true);
    this.svg = this.container.append("svg");
    this.group = this.svg.append("g");

    this.tooltip = new VisTooltip({ el: this.el });

    this.wrangleData();
    this.resizeVis();
    window.addEventListener("resize", this.resizeVis);
  }

  wrangleData() {
    if (!this.cachedRoots) this.cachedRoots = {};
    if (this.groupedByCategory) {
      if (!this.cachedRoots.grouped) {
        const group = d3.group(
          this.data,
          this.accessor.category,
          this.accessor.folio,
          this.accessor.page,
          this.accessor.entry
        );
        const hierarchy = d3.hierarchy(group);
        this.cachedRoots.grouped = hierarchy
          .sum((d) => (Array.isArray(d) ? 0 : this.accessor.length(d)))
          .sort((a, b) =>
            a.depth === 1 && b.depth === 1 ? b.value - a.value : 0
          );
      }
      this.displayRoot = this.cachedRoots.grouped;
    } else {
      if (!this.cachedRoots.notGrouped) {
        const group = d3.group(
          this.data,
          this.accessor.folio,
          this.accessor.page,
          this.accessor.entry
        );
        const hierarchy = d3.hierarchy(group);
        this.cachedRoots.notGrouped = hierarchy.sum((d) =>
          Array.isArray(d) ? 0 : this.accessor.length(d)
        );
      }
      this.displayRoot = this.cachedRoots.notGrouped;
    }
    this.root = this.displayRoot;
  }

  resizeVis() {
    this.width = this.el.clientWidth;
    this.x.rangeRound([0, this.width]);
    this.svg.attr("viewBox", [
      0.5,
      -this.marginTop - 0.5,
      this.width,
      this.marginTop + this.height,
    ]);
    d3.treemap().tile(d3.treemapResquarify)(this.root);
    this.updateVis();
  }

  updateVis() {
    this.x.domain([this.displayRoot.x0, this.displayRoot.x1]);
    this.y.domain([this.displayRoot.y0, this.displayRoot.y1]);
    this.group.call(this.render, this.displayRoot);
  }

  render(group, root) {
    const nodes =
      root.height === 3
        ? root.descendants().reverse()
        : root.children.concat(root);

    const node = group
      .selectAll("g")
      .data(nodes, (d) => d.data[0])
      .join("g");

    node
      .filter((d) => (d === root ? d.parent : d.height > 1))
      .attr("cursor", "pointer")
      .on("click", (event, d) =>
        d === root ? this.zoomout(root) : this.zoomin(d)
      );

    node
      .on("mouseover", (event, d) => {
        const html = this.tooltipContent(d, root);
        this.tooltip.show(html, event.currentTarget);
      })
      .on("mouseout", this.tooltip.hide);

    node
      .append("rect")
      .attr("id", (d) => (d.leafUid = this.createUUID()))
      .attr(
        "class",
        (d) =>
          `cell-rect cell-rect--${
            d === root ? "root" : d.height > 1 ? "non-leaf" : "leaf"
          }`
      )
      .attr("fill", (d) => {
        if (d.depth === 0) {
          return this.rootColor;
        } else if (d.height === 2) {
          return "none";
        } else {
          const totalLengthByCategory = d3.rollups(
            d.leaves().map((d) => d.data),
            (v) => d3.sum(v, this.accessor.length),
            this.accessor.category
          );
          const largestLengthCategory =
            totalLengthByCategory[
              d3.maxIndex(totalLengthByCategory, (d) => d[1])
            ][0];
          return this.color(largestLengthCategory);
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", (d) => (d.height === 2 ? 2 : null));

    node
      .append("clipPath")
      .attr("id", (d) => (d.clipUid = this.createUUID()))
      .append("use")
      .attr("xlink:href", (d) => `#${d.leafUid}`);

    node
      .append("text")
      .attr("clip-path", (d) => `url(#${d.clipUid})`)
      .attr(
        "class",
        (d) => `cell-label ${d === root ? "cell-label--root" : ""}`
      )
      .selectAll("tspan")
      .data((d) => [
        d === root ? this.path(d) : this.name(d),
        this.format(d.value),
      ])
      .join("tspan")
      .attr("x", 3)
      .attr(
        "y",
        (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
      )
      .attr("class", (d, i, nodes) =>
        i === nodes.length - 1 ? "cell-label__value" : "cell-label__name"
      )
      .text((d) => d)
      .attr("display", function () {
        return d3.select(this.parentNode).datum().height === 2 ? "none" : null;
      });

    group.call(this.position, root);
  }

  position(group, root) {
    group
      .selectAll("g")
      .attr("transform", (d) =>
        d === root
          ? `translate(0,-${this.marginTop})`
          : `translate(${this.x(d.x0)},${this.y(d.y0)})`
      )
      .select("rect")
      .attr("width", (d) =>
        d === root ? this.width : this.x(d.x1) - this.x(d.x0)
      )
      .attr("height", (d) =>
        d === root ? this.marginTop : this.y(d.y1) - this.y(d.y0)
      );
  }

  zoomin(d) {
    const group0 = this.group.attr("pointer-events", "none");
    this.group = this.svg
      .append("g")
      .attr("pointer-events", "none")
      .call(this.render, (this.displayRoot = d));

    this.x.domain([d.x0, d.x1]);
    this.y.domain([d.y0, d.y1]);

    this.svg
      .transition()
      .duration(750)
      .call((t) => group0.transition(t).remove().call(this.position, d.parent))
      .call((t) =>
        this.group
          .transition(t)
          .attrTween("opacity", () => d3.interpolate(0, 1))
          .call(this.position, d)
      )
      .on("end", () => {
        this.group.attr("pointer-events", null);
      });
  }

  zoomout(d) {
    const group0 = this.group.attr("pointer-events", "none");
    this.group = this.svg
      .insert("g", "*")
      .attr("pointer-events", "none")
      .call(this.render, (this.displayRoot = d.parent));

    this.x.domain([d.parent.x0, d.parent.x1]);
    this.y.domain([d.parent.y0, d.parent.y1]);

    this.svg
      .transition()
      .duration(750)
      .call((t) =>
        group0
          .transition(t)
          .remove()
          .attrTween("opacity", () => d3.interpolate(1, 0))
          .call(this.position, d)
      )
      .call((t) => this.group.transition(t).call(this.position, d.parent))
      .on("end", () => {
        this.group.attr("pointer-events", null);
      });
  }

  tile(node, x0, y0, x1, y1) {
    d3.treemapBinary(node, 0, 0, this.width, this.height);
    for (const child of node.children) {
      child.x0 = x0 + (child.x0 / this.width) * (x1 - x0);
      child.x1 = x0 + (child.x1 / this.width) * (x1 - x0);
      child.y0 = y0 + (child.y0 / this.height) * (y1 - y0);
      child.y1 = y0 + (child.y1 / this.height) * (y1 - y0);
    }
  }

  name(node) {
    if (this.groupedByCategory) {
      switch (node.depth) {
        case 0:
          return "manuscript";
        case 1:
          return `${node.data[0]}`;
        case 2:
          return `f.${node.data[0]}`;
        case 3:
          return `${node.data[0]}`;
        case 4:
          return `${node.data[0]}`;
        default:
          return "";
      }
    } else {
      switch (node.depth) {
        case 0:
          return "manuscript";
        case 1:
          return `f.${node.data[0]}`;
        case 2:
          return `${node.data[0]}`;
        case 3:
          return `${node.data[0]}`;
        default:
          return "";
      }
    }
  }

  level(node) {
    if (this.groupedByCategory) {
      switch (node.depth) {
        case 0:
          return "manuscript";
        case 1:
          return "category";
        case 2:
          return "folio";
        case 3:
          return "page";
        case 4:
          return "entry";
        default:
          return "";
      }
    } else {
      switch (node.depth) {
        case 0:
          return "manuscript";
        case 1:
          return "folio";
        case 2:
          return "page";
        case 3:
          return "entry";
        default:
          return "";
      }
    }
  }

  path(node) {
    return node
      .ancestors()
      .reverse()
      .map((d) => this.name(d))
      .join("/");
  }

  createUUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  // https://css-tricks.com/better-line-breaks-for-long-urls/
  formatURL(url) {
    var doubleSlash = url.split("//");
    var formatted = doubleSlash
      .map((str) =>
        str
          .replace(/(?<after>:)/giu, "$1<wbr>")
          .replace(/(?<before>[/~.,\-_?#%])/giu, "<wbr>$1")
          .replace(/(?<beforeAndAfter>[=&])/giu, "<wbr>$1<wbr>")
      )
      .join("//<wbr>");

    return formatted;
  }

  tooltipContent(d, root) {
    if (d.height === 1) {
      // Leaf node
      const e = d.data[1][0];
      return `
      <table>
        <tbody>
          <tr>
            <td>${this.level(d)}</td>
            <td class="td--name">${this.accessor.entry(e)}</td>
          </tr>
          <tr>
            <td>title</td>
            <td>${this.accessor.title(e)}</td>
          </tr>
          <tr>
            <td>length</td>
            <td>${this.format(this.accessor.length(e))}</td>
          </tr>
          <tr>
            <td>word count</td>
            <td>${this.format(this.accessor.wordCount(e))}</td>
          </tr>
          <tr>
            <td>category</td>
            <td>${this.accessor.category(e)}</td>
          </tr>
          <tr>
            <td>% marginal</td>
            <td>${this.accessor.percentMargin(e).toFixed(1)}%</td>
          </tr>
          <tr>
            <td colspan="2" class="td--url">
              <a href="${this.accessor.url(
                e
              )}" target="_blank">${this.formatURL(this.accessor.url(e))}</a>
            </td>
          </tr>
        </tbody>
      </table>
        `;
    } else if (d.depth === 0) {
      // Manuscript root
      return `
      <table>
        <tbody>
          <tr>
            <td class="td--name">${this.name(d)}</td>
          </tr>
          <tr>
            <td>length</td>
            <td>${this.format(
              d3.sum(d.leaves(), (e) => this.accessor.length(e.data))
            )}</td>
          </tr>
          <tr>
            <td>word count</td>
            <td>${this.format(
              d3.sum(d.leaves(), (e) => this.accessor.wordCount(e.data))
            )}</td>
          </tr>
        </tbody>
      </table>
          `;
    } else if (d === root) {
      // Go back node
      return `
      <table>
        <tbody>
          <tr>
            <td colspan=2>Go back to</td>
          </tr>
          <tr>
            <td>${this.level(d)}</td>
            <td class="td--name">${this.name(d)}</td>
          </tr>
          <tr>
              <td>length</td>
              <td>${this.format(
                d3.sum(d.leaves(), (e) => this.accessor.length(e.data))
              )}</td>
            </tr>
            <tr>
              <td>word count</td>
              <td>${this.format(
                d3.sum(d.leaves(), (e) => this.accessor.wordCount(e.data))
              )}</td>
            </tr>
        </tbody>
      </table>
      `;
    } else {
      return `
      <table>
        <tbody>
          <tr>
            <td>${this.level(d)}</td>
            <td class="td--name">${this.name(d)}</td>
          </tr>
          <tr>
            <td>length</td>
            <td>${this.format(
              d3.sum(d.leaves(), (e) => this.accessor.length(e.data))
            )}</td>
          </tr>
          <tr>
            <td>word count</td>
            <td>${this.format(
              d3.sum(d.leaves(), (e) => this.accessor.wordCount(e.data))
            )}</td>
          </tr>
        </tbody>
      </table>
        `;
    }
  }

  updateGroupedByCategory(groupedByCategory) {
    this.groupedByCategory = groupedByCategory;
    this.wrangleData();
    this.resizeVis();
  }
}
