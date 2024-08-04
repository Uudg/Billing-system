import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_table} from "../../../api";

const Table = () => {

    const { tableId } = useParams();

    const [table, setTable] = useState<any>(null);

    const get = async (id: string) => {
        try {
            const data = await get_table(id);
            console.log(data);
            setTable(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (tableId)
            get(tableId);
    }, [tableId]);

    const renderDescription = (description: string) => {
        return { __html: description.replace(/\n/g, '<br />') };
    };

    const calculateTotalHours = () => {
        if (!table || !table.main) return 0;
        return table.main.reduce((total: number, row: any) => total + parseFloat(row.hours), 0);
    };

    // const getInvoice = async () => {

    //     if (!tableId) return;
    //     const url = import.meta.env.VITE_API_URL + '/tables/' + tableId + '/invoice';
    //     window.open(url)
    // };

    return (
        <div className="col col-sm-12">
            <div className="block column">
                <h2>
                    {table && table.title}
                </h2>
                <h3>
                    Main
                </h3>
                <div className="table main column">
                    <div className="row header">
                        <div className="cell">Date</div>
                        <div className="cell">Hours</div>
                        <div className="cell desc">Description</div>
                    </div>
                    {table && table.main && table.main.map((row: any, i: number) => (
                        <div key={i} className="row">
                            <div className="cell">{row.date}</div>
                            <div className="cell">{row.hours}</div>
                            <div className="cell desc" dangerouslySetInnerHTML={renderDescription(row.description)}></div>
                        </div>
                    ))}
                </div>
                <h3>
                    Additional
                </h3>
                <div className="table add column">
                    <div className="row header">
                        <div className="cell">Title</div>
                        <div className="cell">Price (€)</div>
                        <div className="cell desc">Description</div>
                    </div>
                    {table && table.additional && table.additional.map((row: any, i: number) => (
                        <div key={i} className="row">
                            <div className="cell">{row.title}</div>
                            <div className="cell">{row.price}</div>
                            <div className="cell desc" dangerouslySetInnerHTML={renderDescription(row.description)}></div>
                        </div>
                    ))}
                </div>
                <div className="total row a-center">
                    Total Hours: 
                    <span>{calculateTotalHours()}</span>
                </div>
                <div className="total row a-center">
                    Total:
                    <span>
                        {table && calculateTotalHours() * table.rate + table.additional.reduce((total: number, row: any) => total + parseFloat(row.price), 0) + ' €'}
                    </span>
                </div>
                {/* <button className="invoice" onClick={getInvoice}>
                    Get Invoice
                </button> */}
            </div>
        </div>
    );
};

export default Table;