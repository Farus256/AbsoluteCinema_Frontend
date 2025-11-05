import adminRoute from "./adminRoute";
import commonRoute from "./commonRoute";
import userRoute from "./UserRoute";
import userUtils from "../../helpers/userUtils";

const roles = {
    "Guest": commonRoute,
    "User": userRoute,
    "Admin": adminRoute,
}
function createRoute() {
    let route = []
    let userRole = userUtils.GetUserRoles()
    for (const role in roles) {
        if (userRole.includes(role)) {
            route = [...route, ...roles[role]]
        }
    }
    return route
}

export default createRoute
