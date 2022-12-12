const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    case "OPEN_SETTINGS":
      return { ...state, openSettings: true };
    case "CLOSE_SETTINGS":
      return { ...state, openSettings: false };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    case "UPDATE_USER":
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case "UPDATE_DETAILS":
      return { ...state, details: { ...state.details, ...action.payload } };
    case "UPDATE_IMAGES":
      return { ...state, images: [...state.images, ...action.payload] };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "RESET_DETAIL":
      return {
        ...state,
        images: [],
        details: { title: "", description: "" },
        file: [],
      };
    case "UPDATE_FILES":
      return { ...state, file: action.payload };
    case "UPDATE_DOCS":
      return {
        ...state,
        docs: action.payload,
      };
    case "DELETE_DOC":
      return {
        ...state,
        docs: state.docs.filter((doc) => doc._id !== action.payload),
      };
    case "UPDATE_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "SET_ASSIGNEE":
      return {
        ...state,
        assigned: [...action.payload],
      };
    case "RESET_ASSIGNEE":
      return {
        ...state,
        assigned: null,
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task !== action.payload),
      };

    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event !== action.payload),
      };
    case "UPDATE_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    case "UPDATE_COMPANIES":
      return { ...state, companies: action.payload };
    default:
      throw new Error("No matched action!");

    case "UPDATE_COMPANY":
      return {
        ...state,
        company: action.payload,
      };
    case "DELETE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company._id !== action.payload
        ),
      };
    case "RE_RENDER":
      return { ...state, render: !state.render };

    case "UPDATE_PERSON_NAME":
      return {
        ...state,
        personName: action.payload,
      };

    case "SET_ASSIGNEE_MAIL":
      return {
        ...state,
        assigneeMail: action.payload,
      };
  }
};

export default reducer;
