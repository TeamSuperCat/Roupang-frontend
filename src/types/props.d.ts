interface IChildrenProps {
  children?: React.ReactNode;
  onClick?: NoneEvent;
}

interface IButtonProps extends IChildrenProps {
  primary?: boolean;
  rotateState?: boolean;
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
