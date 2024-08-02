import { useEffect, useState } from "react";
import { get_client_tables } from "../../../api";
import { useNavigate } from "react-router-dom";

interface Props {
    id: string
}

const TableList = ({id} : Props) => {

    const [list, setList] = useState<any[]>([])
    const navigate = useNavigate();

    const get = async (id: string) => {
        try {
            const response = await get_client_tables(id)
            setList(response);
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        if (id)
            get(id)
    }, [])

    return(
        <div className="col col-sm-12">
            <div className="block">
                <h2>
                    Tables
                </h2>
                <div className="list column">
                    {list.map((item: any, i) => (
                        <button className="title" key={i} onClick={() => navigate(`table/${item._id}`)}>
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TableList;