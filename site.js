(function () {
  "use strict";

  var page = window.location.pathname.split("/").pop() || "index.html";
  if (page === "homepage-preview.html") page = "index.html";
  if (page === "vicbrew2025.html") page = "vicbrew2026.html";
  document.querySelectorAll("[data-page]").forEach(function (link) {
    if (link.dataset.page === page) link.setAttribute("aria-current", "page");
  });

  // Retire dated notices at the end of their final day in Victoria.
  var parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  function part(type) {
    return parts.find(function (item) { return item.type === type; }).value;
  }
  var today = part("year") + "-" + part("month") + "-" + part("day");
  document.querySelectorAll("[data-next-competition]").forEach(function (competition) {
    if (today > competition.dataset.endDate) {
      competition.querySelector("[data-upcoming-event]").hidden = true;
      competition.querySelector("[data-competition-fallback]").hidden = false;
      competition.querySelector("[data-competition-label]").textContent = "Plan your next competition";
    }
  });

  // The championship archives retain their original day-by-day schedules.
  document.querySelectorAll(".nav-tabs").forEach(function (tabList) {
    var tabs = Array.from(tabList.querySelectorAll('a[href^="#"]'));
    tabList.setAttribute("role", "tablist");
    function selectTab(selected) {
      tabs.forEach(function (tab) {
        var active = tab === selected;
        var id = tab.getAttribute("href").slice(1);
        var panel = document.getElementById(id);
        tab.id = "tab-" + id;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", id);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        tab.parentElement.classList.toggle("active", active);
        if (panel) {
          panel.classList.toggle("active", active);
          panel.hidden = !active;
          panel.setAttribute("role", "tabpanel");
          panel.setAttribute("aria-labelledby", tab.id);
        }
      });
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function (event) {
        event.preventDefault();
        selectTab(tab);
      });
      tab.addEventListener("keydown", function (event) {
        var next;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          selectTab(tabs[next]);
          tabs[next].focus();
        }
      });
    });
    if (tabs.length) selectTab(tabs.find(function (tab) {
      return tab.parentElement.classList.contains("active");
    }) || tabs[0]);
  });
}());
