import { useAppDispatch, useAppSelector } from "../data/hooks";
import { fetchSinglePartner } from "../data/features/partnerSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function PartnerShow() {
    const { id } = useParams();
    const partner = useAppSelector(state => state.partner.showPartner);

    const dispatch = useAppDispatch();
    
    useEffect( () => {
        if(!id) return;
        const idNum = Number.parseInt(id);

        if(partner && partner.id == idNum) return;

        console.log("dispatch fetchSinglePartner: id=", idNum);

        dispatch(fetchSinglePartner(idNum));
    });

    function showPartnerDetails() {
        if(!partner) return;

        const descriptionLines = partner.description.split( /[\n\r]+/ )
        let fakeId = 0;

        return (
            <div>
                <h1>{partner.name}</h1>
                <h3>{partner.summary}</h3>

                { descriptionLines.map( line => <p key={fakeId++} >{line}</p> ) }
                
            </div>
        )
    }
    return (
        <>
            <h1>Showing partner...</h1>
            {partner && showPartnerDetails()}
        </>
    )
}

export default PartnerShow;
