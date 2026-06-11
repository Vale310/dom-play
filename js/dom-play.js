/* dom-play.js — Rehearsal Line Highlighter
   Discovers actors from the DOM, builds buttons, highlights lines on click. */

function getActors() {
  var lines = document.querySelectorAll('.line[data-actor]');
  var actors = new Set();
  lines.forEach(function (line) {
    line.dataset.actor.split(' ').forEach(function (a) {
      actors.add(a);
    });
  });
  return Array.from(actors);
}

function buildButtons() {
  var container = document.getElementById('actor-buttons');
  getActors().forEach(function (actor) {
    var btn = document.createElement('button');
    btn.textContent = actor.charAt(0).toUpperCase() + actor.slice(1);
    btn.dataset.actor = actor;
    container.appendChild(btn);
  });
  var clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.dataset.actor = '';
  clearBtn.className = 'clear-btn';
  container.appendChild(clearBtn);
}

function highlightActor(actor) {
  var play = document.getElementById('play');
  if (actor) {
    play.classList.add('filtering');
  } else {
    play.classList.remove('filtering');
  }

  document.querySelectorAll('.line[data-actor]').forEach(function (line) {
    var speakers = line.dataset.actor.split(' ');
    line.classList.toggle('highlighted', speakers.indexOf(actor) !== -1);
  });

  document.querySelectorAll('#actor-buttons button').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.actor === actor);
  });
}

document.getElementById('actor-buttons').addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    highlightActor(e.target.dataset.actor);
  }
});

buildButtons();
