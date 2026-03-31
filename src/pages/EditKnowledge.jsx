import { useParams } from "react-router-dom";
import AddKnowledge from "./AddKnowledge";


export default function EditKnowledge() {
  const { id } = useParams();

  return <AddKnowledge editId={id} />;
}
