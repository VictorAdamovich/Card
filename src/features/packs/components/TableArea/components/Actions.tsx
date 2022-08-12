import React from 'react';

import { School } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/store';
import { CustomModal } from 'common/components/modal/CustomModal';
import { DeletePackButton } from 'common/components/modal/deletePack/DeletePackButton';
import { DeletePackModal } from 'common/components/modal/deletePack/DeletePackModal';
import { UpdatePackButton } from 'common/components/modal/updatePack/UpdatePackButton';
import { UpdatePackModal } from 'common/components/modal/updatePack/UpdatePackModal';
import { RoutePath } from 'common/enums/route-path';

type ActionsPropsType = {
  packId: string;
  userId: string;
};

export const Actions = (props: ActionsPropsType): React.ReactElement => {
  const navigate = useNavigate();
  const { userId, packId } = props;

  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const canUserChangingPack = userId === currentUserId;

  const handleClickOpenPackCards = (): void => {
    navigate(`${RoutePath.Packs}/${packId}/cards/learn`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <IconButton onClick={handleClickOpenPackCards}>
        <School />
      </IconButton>
      {canUserChangingPack && (
        <CustomModal
          modalChild={UpdatePackModal}
          buttonChild={UpdatePackButton}
          packId={packId}
        />
      )}
      {canUserChangingPack && (
        <CustomModal
          modalChild={DeletePackModal}
          buttonChild={DeletePackButton}
          packId={packId}
        />
      )}
    </div>
  );
};
