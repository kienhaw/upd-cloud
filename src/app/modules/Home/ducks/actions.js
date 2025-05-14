import axios from '../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { baseUrl } from '../../../../configs/constants';

export const getTokenTransfers = (page, limit, order, orderby, search = null, load) => async (dispatch) => {
  load && load(true);
  let ordering = '';
  if (order == 'ascend') {
    ordering = 'ASC';
  } else if (order == 'descend') {
    ordering = 'DESC';
  }
  const {
    data: { transfers },
  } = await axios.get(`${baseUrl}/token-transfers`);
  load && load(false);
  dispatch({
    type: action_types.TOKEN_TRANSFERS,
    data: transfers,
  });
};
