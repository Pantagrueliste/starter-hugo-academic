const CSV_URL = "distribution-analysis-corrected-2.csv";
d3.csv(CSV_URL).then((data) => {
  new Treemap({
    el: document.querySelector("#treemap"),
    data,
  });
});
