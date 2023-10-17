import { useContext } from "react";

import { userContext } from "../providers/UserContext";

function useUserContext() {
	return useContext(userContext);
}

export default useUserContext;
