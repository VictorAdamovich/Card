import React from 'react';

import { Edit, School } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import { CustomModal } from 'common/components/modal/CustomModal';
import { DeletePackButton } from 'common/components/modal/deletePack/DeletePackButton';
import { DeletePackModal } from 'common/components/modal/deletePack/DeletePackModal';
import { RoutePath } from 'common/enums/route-path';
import { setPackCardsTC } from 'features/cards/cards-reducer';

type ActionsPropsType = {
  packId: string;
  userId: string;
};

export const Actions = (props: ActionsPropsType): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId, packId } = props;

  const currentUserId = useAppSelector(state => state.login.userInfo._id);

  const canUserChangingPack = userId === currentUserId;

  const handleClickOpenPackCards = (): void => {
    dispatch(setPackCardsTC({ cardsPack_id: packId }));
    navigate(`${RoutePath.Packs}/${packId}/cards`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <IconButton onClick={handleClickOpenPackCards}>
        <School />
      </IconButton>
      {canUserChangingPack && (
        <IconButton>
          <Edit />
        </IconButton>
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
