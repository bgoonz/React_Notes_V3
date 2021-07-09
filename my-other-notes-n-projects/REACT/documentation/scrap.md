
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: var(--font-family-body);
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 2;
  color: var(--color-text);
}

section + section {
  padding-top: 2rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-heading);
  color: var(--color-heading);
  font-style: normal;
  line-height: 1.2;
  font-weight: 600;
}

section + section {
  padding-top: 2rem;
}

a {
  color: inherit;
  text-decoration: none;
  color: var(--color-secondary);
  transition: color ease-out var(--transition-duration);
}

a.current,
a:hover:not(.skip-link),
a:focus:not(.skip-link) {
  color: var(--color-primary);
}

a:not(.navigation-anchor)[rel~='external']:after {
  content: ' ➚'
}

ul:not(.navigation):not(.inline-list) {
  list-style: none;
}

ul:not(.navigation):not(.inline-list) li::before {
  content: "\25A0";
  color: var(--color-primary);
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
.rtl ul:not(.navigation):not(.inline-list) li::before{
  margin-right: -1em;
  margin-left: initial;
}

li {
  margin-bottom: 0.6rem;
}

strong,
b {
  font-weight: 600;
}

time {
  display: inline-block;
  color: var(--color-gray-70);
}

[tabindex='-1'] {
  outline: 0;
}

img,
svg {
  vertical-align: middle;
}

img {
  display: block;
  max-width: 100%;
  border-radius: var(--border-radius-default);
}

code {
  font-family: var(--font-family-code);
  color: var(--color-code);
  font-style: normal;
  font-size: 1rem;
}

blockquote:not([class]) {
  padding-left: 1rem;
  margin-left: -1rem;
  border-left: 2px solid var(--color-primary);
  color: var(--color-gray-70);
  font-style: italic;
}

code[class*=language-],
pre[class*=language-] {
  font-size: 0.9rem;
  font-style: normal;
}

p + pre[class*=language-] {
  margin-bottom: 1.8rem;
}

mark {
  color: var(--color-highlight);
  background-color: transparent;
}

dt {
  font-weight: 700;
}

dd + dt {
  padding-top: 0.5rem;
}

abbr[title], acronym[title] {
  background: var(--color-gray-opacity);
  border: 1px solid var(--color-gray-opacity);
  cursor: help;
}
