import { useAppDispatch, useAppSelector } from "../data/hooks";
import { fetchPartners, PartnerLoadState } from "../data/features/partnerSlice";
import { useEffect } from "react";

function PartnersIndex() {
  const partnerAbbrList = useAppSelector( state => state.partner.partners );
  const partnerListState = useAppSelector( state => state.partner.state );

  const dispatch = useAppDispatch();

  useEffect( () => {
    if(partnerListState == PartnerLoadState.NEW) {
      console.log("partners index useEffect");
      dispatch(fetchPartners());
    }
  });

  return (
    <>
      <h1>A PartnersIndex thing</h1>

      <ul>
        {partnerAbbrList.map( 
          partner => 
            <li key={partner.id}>
              <h2>{partner.name}</h2>
              <p>{partner.summary}</p>
            </li>
        )}
      </ul>
    </>
  )
}

export default PartnersIndex;
