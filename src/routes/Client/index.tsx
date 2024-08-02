import { useEffect, useState } from "react";
import { get_client } from "../../api";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import TableList from "./components/TableList";

const Client = () => {

    const [client, setClient] = useState<any>(null)
    const {clientId} = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        if (clientId)
            get(clientId);
    },[clientId])

    const get = async (id: string) => {
        try {
            const data = await get_client(id);
            console.log(data)
            setClient(data)
        } catch (err) {
            console.log(err)
        }
    }

    const goToClient = () => {
        navigate(`/${clientId}`)
    }

    useEffect(() => {
        console.log(client)
    }, [client])

    return (
        <div className="client">
            <h1 onClick={goToClient}>
                {client && client.title}
            </h1>
            <div className="grid">
                {clientId && <TableList id={clientId}/>}
                <Outlet/>
            </div>
        </div>
    )

}

export default Client;