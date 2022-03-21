const CSV_URL = "distribution-analysis-corrected-2.csv";
d3.csv(CSV_URL).then((data) => {
  const groupByCategorySwitch = document.querySelector(
    "#group-by-category-switch"
  );

  const treemap = new Treemap({
    el: document.querySelector("#treemap"),
    data,
    groupedByCategory: groupByCategorySwitch.checked,
  });

  groupByCategorySwitch.addEventListener("change", (event) => {
    treemap.updateGroupedByCategory(event.target.checked);
  });
});
