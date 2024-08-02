import { RouteObject } from "react-router-dom";
import Client from "../routes/Client";
import Table from "../routes/Client/components/Table";

const routes: RouteObject[] = [
    {
        path: ":clientId/",
        element: <Client/>,
        children: [
            {
                path: "table/:tableId",
                element: <Table/>
            }
        ]
    }
];

export default routes;