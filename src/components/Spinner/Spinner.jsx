
import ClipLoader from "react-spinners/ClipLoader"
import BeatLoader from 'react-spinners/BeatLoader'
// import { FaFaceSmileBeam } from "react-icons/fa6";
import './Spinner.css'
const Spinner = () => {
  return (
    <div className="spinner vh-100 flex-column">
      <ClipLoader size={70} color="#36d7b7" />
      <div className="d-flex align-items-center py-3">
        <p className="fw-bold fs-5">Uploading, please wait</p>
        <BeatLoader className="text-center mb-1" size={4} color="#000000" speedMultiplier={0.8} />
        {/* <FaFaceSmileBeam className="text-center mb-3 ms-2 text-danger" size={25} /> */}
      </div>
    </div>
  )
}
export default Spinner
