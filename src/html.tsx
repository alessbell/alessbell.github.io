import * as React from 'react';

type HTMLProps = {
  htmlAttributes: React.AllHTMLAttributes<HTMLElement>;
  headComponents: [];
  preBodyComponents: [];
  body: string;
  postBodyComponents: [];
};

const HTML = ({
  htmlAttributes,
  headComponents,
  preBodyComponents,
  body,
  postBodyComponents,
}: HTMLProps): JSX.Element => {
  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
      </head>
      <body className="light">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                });
                setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
              })();
              (function() {
                window.__onShaderChange = function() {};
                function setShader(newShader) {
                  window.__shader = newShader;
                  preferredShader = newShader;
                  window.__onShaderChange(newShader);
                }
                var preferredShader;
                try {
                  preferredShader = localStorage.getItem('shader');
                } catch (err) {}
                window.__setPreferredShader = function(newShader) {
                  setShader(newShader);
                  try {
                    localStorage.setItem('shader', newShader);
                  } catch (err) {}
                }
                setShader(preferredShader || '0');
              })();
            `,
          }}
        />
        {preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;
