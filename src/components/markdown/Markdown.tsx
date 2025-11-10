import { Divider, Link, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Link as RouterLink } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import '../../utils/highlight';
import type { MarkdownProps } from './types';
import Image from '../image';
import StyledMarkdown from './styles';

export default function Markdown({ sx, ...other }: MarkdownProps) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]}
        components={components}
        {...other}
      />
    </StyledMarkdown>
  );
}

const components = {
  h1: ({ ...props }) => <Typography variant="h1" gutterBottom {...props} />,
  h2: ({ ...props }) => <Typography variant="h2" gutterBottom {...props} />,
  h3: ({ ...props }) => <Typography variant="h3" gutterBottom {...props} />,
  h4: ({ ...props }) => <Typography variant="h4" gutterBottom {...props} />,
  h5: ({ ...props }) => <Typography variant="h5" gutterBottom {...props} />,
  h6: ({ ...props }) => <Typography variant="h6" gutterBottom {...props} />,
  p: ({ ...props }) => <Typography paragraph {...props} />,
  hr: ({ ...props }) => <Divider sx={{ my: 3 }} {...props} />,
  img: ({ ...props }) => (
    <Image alt={props.alt} ratio="16/9" sx={{ borderRadius: 2, my: 5 }} {...props} />
  ),
  a: ({ ...props }) => {
    const isHttp = props.href.includes('http');

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link component={RouterLink} to={props.href} {...props}>
        {props.children}
      </Link>
    );
  },
};
