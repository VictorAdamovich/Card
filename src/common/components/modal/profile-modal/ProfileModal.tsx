import React from 'react';

import styles from 'common/components/modal/profile-modal/ProfileModal.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const ProfileModal = (): ReturnComponentType => {
  const a = 'sda';
  return <div className={styles.modalWrapper}>{a}</div>;
};
