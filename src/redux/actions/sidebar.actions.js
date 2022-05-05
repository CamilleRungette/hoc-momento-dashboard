import { HIDE_SIDEBAR, SHOW_SIDEBAR } from "../reducers/sidebar.reducer";

const hideSibar = () => ({
  type: HIDE_SIDEBAR
});

const showSidebar = () => ({
  type: SHOW_SIDEBAR
})

export default {hideSibar, showSidebar};