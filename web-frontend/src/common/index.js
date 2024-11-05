const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/get-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  createCategory: {
    url: `${backendDomain}/api/create-category`,
    method: "post",
  },
  getCategory: {
    url: `${backendDomain}/api/get-category`,
    method: "get",
  },
  createStore: {
    url: `${backendDomain}/api/create-store`,
    method: "post",
  },
  getStores: {
    url: `${backendDomain}/api/get-store`,
    method: "get",
  },
  updateStore: {
    url: `${backendDomain}/api/update-store`,
    method: "put",
  },
  deleteStore: (storeId) => ({
    url: `${backendDomain}/api/store/${storeId}`,
    method: "delete",
  }),
  createPackage: {
    url: `${backendDomain}/api/create-package`,
    method: "post",
  },
  getPackage: {
    url: `${backendDomain}/api/get-package`,
    method: "get",
  },
};

export default SummaryApi;
