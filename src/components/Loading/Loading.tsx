import { LoadingWrapper } from "./stLoading";

interface Props {
  size?: number | string;
}

const Loading = ({ size }: Props) => {
  return (
    <LoadingWrapper size={size}>
      <h1>
        <span>r</span>
        <span>o</span>
        <span>u</span>
        <span>p</span>
        <span>a</span>
        <span>n</span>
        <span>g</span>
      </h1>
    </LoadingWrapper>
  );
};

export default Loading;
