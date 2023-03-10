import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Tag } from '../components/styles';

type FrontMatter = {
  title: string;
  spoiler: string;
  date: string;
  keywords?: string[];
};

type Article = {
  fields: {
    slug: string;
  };
  frontmatter: FrontMatter;
};

type BlogPostData = {
  data: {
    mdx: {
      frontmatter: FrontMatter;
      excerpt: string;
      body?: string;
    };
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
  };
  pageContext: {
    previous: Article;
    next: Article;
  };
  pathContext: {
    slug?: string;
  };
};

const BlogPostTemplate = ({
  data: {
    mdx: { frontmatter, excerpt, body },
    site: {
      siteMetadata: { siteUrl },
    },
  },
  pageContext: { previous, next },
  pathContext: { slug },
}: BlogPostData): JSX.Element => (
  <Layout>
    <SEO
      ogImageProp={slug ? `${siteUrl}${slug}twitter-card.jpg` : undefined}
      title={frontmatter.title}
      description={excerpt}
      keywords={frontmatter.keywords ? frontmatter.keywords : []}
    />
    <h2>{frontmatter.title}</h2>
    <h3>{frontmatter.spoiler}</h3>
    <div
      style={{
        display: 'inline',
        lineHeight: 'initial',
      }}
    >
      <small style={{ marginRight: '0.6rem', fontSize: '0.9rem' }}>
        {frontmatter.date}
      </small>
      {frontmatter.keywords?.map((keyword, i) => (
        <Tag key={i}>{keyword}</Tag>
      ))}
    </div>
    {body && (
      <div className="post-content" style={{ marginTop: '1.5rem' }}>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    )}
    <hr />
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        marginLeft: `0`,
        marginRight: `0`,
        justifyContent: `space-between`,
        listStyle: `none`,
        padding: 0,
      }}
    >
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ??? {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} ???
          </Link>
        )}
      </li>
    </ul>
  </Layout>
);

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        spoiler
        keywords
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;
