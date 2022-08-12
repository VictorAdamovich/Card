import React from 'react';

import { AddNewPackButton } from 'common/components/modal/AddNewPack/AddNewPackButton';
import { AddNewPackModal } from 'common/components/modal/AddNewPack/AddNewPackModal';
import { CustomModal } from 'common/components/modal/CustomModal';
import styles from 'common/components/titleArea/TitleArea.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TitleAreaPropsType = {
  title: string;
};

export const TitleArea = React.memo((props: TitleAreaPropsType): ReturnComponentType => {
  const { title } = props;

  return (
    <div className={styles.titleArea}>
      <div>{title}</div>
      <CustomModal modalChild={AddNewPackModal} buttonChild={AddNewPackButton} />
    </div>
  );
});
