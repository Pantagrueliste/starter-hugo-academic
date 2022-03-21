// https://observablehq.com/@d3/zoomable-treemap
class Treemap {
  constructor({ el, data }) {
    this.el = el;
    this.data = data;
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
      .range(['#ffbb68', '#fac379', '#f4cb88', '#efd298', '#ead9a6', '#e5e0b4', '#e1e6c2', '#ddecce', '#dcf2da', '#ddf7e3', '#e2fbeb', '#edfef1', '#fffff2', '#eff7df', '#e0f0dd', '#d2e8dc', '#c3e0da', '#b6d8d7', '#a9d0d4', '#9ec7d1', '#95becd', '#8fb5c8', '#8dabc1', '#939fb8', '#ad8ea6']);
    
    this.container = d3.select(this.el).classed("vis-treemap", true);
    this.svg = this.container.append("svg");
    this.group = this.svg.append("g");

    this.tooltip = new VisTooltip({ el: this.el });

    this.wrangleData();
    this.resizeVis();
    window.addEventListener("resize", this.resizeVis);
  }

  wrangleData() {
    const group = d3.group(this.data, this.accessor.folio, this.accessor.entry);
    const hierarchy = d3.hierarchy(group);
    this.root = hierarchy.sum((d) =>
      Array.isArray(d) ? 0 : this.accessor.length(d)
    );
    // .sort((a, b) => b.value - a.value);
    this.displayRoot = this.root;
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
    const node = group
      .selectAll("g")
      .data(root.children.concat(root))
      .join("g");

    node
      .filter((d) => (d === root ? d.parent : d.height > 1))
      .attr("cursor", "pointer")
      .on("click", (event, d) =>
        d === root ? this.zoomout(root) : this.zoomin(d)
      );

    node
      .filter((d) => d.height === 1)
      .on("mouseover", (event, d) => {
        const e = d.data[1][0];
        const html = `
          <table>
            <tbody>
              <tr>
                <td colspan="2" class="td--name">${this.accessor.entry(e)}</td>
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
                  )}" target="_blank">${this.formatURL(
          this.accessor.url(e)
        )}</a>
                </td>
              </tr>
            </tbody>
          </table>
        `;
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
        switch (d.height) {
          case 1:
            return this.color(this.accessor.category(d.data[1][0]));
          case 2:
            const totalLengthByCategory = d3.rollups(
              Array.from(d.data[1].values()).map((d) => d[0]),
              (v) => d3.sum(v, this.accessor.length),
              this.accessor.category
            );
            const largestLengthCategory =
              totalLengthByCategory[
                d3.maxIndex(totalLengthByCategory, (d) => d[1])
              ][0];
            return this.color(largestLengthCategory);
          default:
            return this.rootColor;
        }
      });

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
        //`${this.format(d.value)} char.`,
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
      .text((d) => d);

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
    switch (node.depth) {
      case 0:
        return "manuscript";
      case 1:
        return `fol. ${node.data[0]}`;
      case 2:
        return `${node.data[0]}`;
      default:
        return "";
    }
  }

  path(node) {
    return node.ancestors().reverse().map(this.name).join("/");
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
}
