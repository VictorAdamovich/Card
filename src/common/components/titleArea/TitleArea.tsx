import React from 'react';

import { AddNewPackName } from 'common/components/modal/AddNewPackName';
import styles from 'common/components/titleArea/TitleArea.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TitleAreaPropsType = {
  title: string;
  buttonTitle: string;
  addNewName: (newName: string) => void;
};

export const TitleArea = React.memo((props: TitleAreaPropsType): ReturnComponentType => {
  const { title, addNewName, buttonTitle } = props;

  return (
    <div className={styles.titleArea}>
      <div>{title}</div>
      <AddNewPackName buttonTitle={buttonTitle} addNewPackName={addNewName} />
    </div>
  );
});
