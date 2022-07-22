const initialState: InitialStateType = {};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/TEST':
      return { ...state };
    default:
      return { ...state };
  }
};

export const appAC = () => ({ type: 'APP/TEST' } as const);

export type InitialStateType = {};

type ActionsType = ReturnType<typeof appAC>;
