interface IChildrenProps {
  children?: React.ReactNode;
  onClick?: NoneEvent;
}

interface IButtonProps extends IChildrenProps {
  $active?: boolean;
  category?: boolean;
  primary?: boolean;
  rotateState?: boolean;
  text: string;
}

interface INoneEventFunc {
  onClick: NoneEvent;
}

interface IToggleStateProps {
  state: {
    value: boolean;
  };
}

type NoneEvent = () => void;
type HasClickEvent = (e: ClickEventType) => void;
