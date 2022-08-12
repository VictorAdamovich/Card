import React, { ReactElement, useCallback } from 'react';

import { ReturnComponentType } from 'types/ReturnComponentType';

type CustomModalProps = {
  modalChild: (
    isOpen: boolean,
    setIsOpen: (newIsOpen: boolean) => void,
    packId?: string,
  ) => ReactElement;
  buttonChild: (setIsOpen: () => void) => ReactElement;
  packId?: string;
};

export const CustomModal = (props: CustomModalProps): ReturnComponentType => {
  const { modalChild, buttonChild, packId } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  const setIsOpen = (isOpen: boolean): void => {
    setOpen(isOpen);
  };

  return (
    <div>
      {buttonChild(handleClickOpen)}
      {modalChild(open, setIsOpen, packId)}
    </div>
  );
};
