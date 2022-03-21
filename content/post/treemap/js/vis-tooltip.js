class VisTooltip {
  constructor({ el }) {
    this.el = el;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.init();
  }

  init() {
    this.container = d3.select(this.el).classed("vis-tooltip-parent", true);
    this.tooltip = this.container
      .append("div")
      .attr("class", "vis-tooltip")
      .on("mouseover", () => {
        this.tooltip.classed("is-visible", true);
      })
      .on("mouseout", () => {
        this.tooltip.classed("is-visible", false);
      });
  }

  show(html, target) {
    this.tooltip.html(html).classed("is-visible", true);

    const containerBox = this.el.getBoundingClientRect();
    const tooltipBox = this.tooltip.node().getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();

    const x0 = targetBox.x - containerBox.x;
    const y0 = targetBox.y - containerBox.y;
    let x = x0 + 4;
    if (x + tooltipBox.width > containerBox.width) {
      x = containerBox.width - tooltipBox.width - 4;
    }
    let y = y0 + 28;
    if (y + tooltipBox.height > containerBox.height) {
      y = y0 - tooltipBox.height;
    }
    this.tooltip.style("transform", `translate(${x}px,${y}px)`);
  }

  hide() {
    this.tooltip.classed("is-visible", false);
  }
}
