// export const userFormReducer = (state, action) => {
//     const { type, data,id, deleteId,nameId } = action;
//     switch (type) {
//         case "Add":
//             return [
//                 ...state,
//                 data
//             ];
//         case 'Edit':
//             state[state.findIndex((item) => item.role === id)] = { ...data,nameId:id };
//             return [...state];
//         case 'Delete':
//             return [...state.filter((item) => item.nameId !== deleteId)];
//         default:
//             return state;
//     }
// }