declare module '*.png';
declare module 'gatsby-plugin-mdx' {
  import * as React from 'react';
  type MDXRendererProps = {
    components?: React.Component;
  };
  export class MDXRenderer extends React.Component<MDXRendererProps> {}
}

declare module '*.svg' {
  const content: unknown;
  export default content;
}

declare module '@mdx-js/react' {
  import * as React from 'react';
  type ComponentType =
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'thematicBreak'
    | 'blockquote'
    | 'ul'
    | 'ol'
    | 'li'
    | 'table'
    | 'tr'
    | 'td'
    | 'pre'
    | 'code'
    | 'em'
    | 'strong'
    | 'delete'
    | 'inlineCode'
    | 'hr'
    | 'a'
    | 'img';
  export type Components = {
    [key in ComponentType]?: React.ComponentType<{ children: React.ReactNode }>;
  };
  export type MDXProviderProps = {
    children: React.ReactNode;
    components: Components;
  };
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}
