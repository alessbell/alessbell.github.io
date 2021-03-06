import * as React from 'react';
import { graphql } from 'gatsby';
import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import slugify from 'slugify';
import FlipMove from 'react-flip-move';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Tag, BlogLink } from '../components/styles';
import { MdxFrontmatter } from '../../graphql-types';

// persist the state of the toggle
let detailsToggleState = true;

const BlogIndex = ({
  data: {
    allMdx: { edges, group },
  },
}: {
  data: {
    allMdx: {
      edges: Array<{
        node: {
          id: string;
          fields: { slug: string };
          frontmatter: MdxFrontmatter;
        };
      }>;
      group: Array<{ tag: string }>;
    };
  };
}): JSX.Element => {
  const keywords = group.map((item) => item.tag);
  const [tags, setTags] = useQueryParam<(string | null)[]>(
    'tags',
    withDefault(ArrayParam, [])
  );
  const [detailsToggle, setDetailsToggle] = React.useState(detailsToggleState);

  React.useEffect(() => {
    detailsToggleState = detailsToggle;
  });

  return (
    <Layout>
      <SEO
        title="A blog by Alessia Bellisario"
        keywords={[
          `blog`,
          `rust`,
          `gatsby`,
          `javascript`,
          `react`,
          ...keywords,
        ]}
      />
      <details
        open={detailsToggle}
        style={{ margin: '2rem 0', fontSize: '0.9rem' }}
      >
        <summary onClick={() => setDetailsToggle(!detailsToggle)}>
          filter by tag
        </summary>
        <div
          style={{
            margin: '0.25rem 0',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {keywords.map((t, idx) => {
            if (!t) return null;
            const slug = slugify(t);
            return (
              <Tag
                key={idx}
                active={tags.includes(slug)}
                onClick={() => {
                  if (!tags.includes(slug)) {
                    setTags([...tags, slug]);
                  } else {
                    setTags(tags.filter((t) => t != slug));
                  }
                }}
              >
                {t}
              </Tag>
            );
          })}
        </div>
      </details>
      <FlipMove
        maintainContainerHeight={true}
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {edges
          .filter(({ node }) => {
            if (tags.length === 0) {
              return true;
            }
            let contains = false;
            node.frontmatter?.keywords?.forEach((keyword) => {
              if (tags.includes(slugify(keyword || ''))) {
                contains = true;
              }
            });
            return contains;
          })
          .map(({ node: { id, fields, frontmatter } }) => (
            <div key={id} style={{ margin: '1.5rem 0' }}>
              {fields?.slug && frontmatter?.title ? (
                <>
                  <h3>
                    <BlogLink to={fields.slug}>{frontmatter.title}</BlogLink>
                  </h3>
                  <p style={{ marginBottom: '5px' }}>{frontmatter.spoiler}</p>
                  <div
                    style={{
                      display: 'inline',
                      lineHeight: 'initial',
                    }}
                  >
                    <small
                      style={{ marginRight: '0.6rem', fontSize: '0.9rem' }}
                    >
                      {frontmatter.date}
                    </small>
                    {frontmatter?.keywords?.map((keyword, i) => (
                      <Tag key={i}>{keyword}</Tag>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
      </FlipMove>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            spoiler
            title
            keywords
          }
          id
        }
      }
      group(field: frontmatter___keywords) {
        tag: fieldValue
      }
    }
  }
`;
