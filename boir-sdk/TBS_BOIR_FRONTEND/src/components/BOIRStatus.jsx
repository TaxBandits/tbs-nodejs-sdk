import React,{useState,useEffect} from 'react'

const BOIRStatus = ({response,isModalOpen,onCLose }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
      isModalOpen ? setIsModalVisible(true) : setIsModalVisible(false);
   },[isModalVisible]); // Run effect on route change

   const closeModal = () => {setIsModalVisible(false);
    onCLose()};
  return (
    <div>
         {isModalOpen && (
        <div
          className="modal fade show d-block modal-backdrop"
          id="statusBOIRModalToggle"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
          data-bs-backdrop="static" data-bs-keyboard="false"  aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered max-w-520px">
            <div className="modal-content rounded-1 border-0" id="ModelBody">
              <div className="modal-header rounded-0 border-top-left-radius-4px border-top-right-radius-4px border-0 p-2px bg-secondary1">
              </div>
              <div className="modal-body position-relative">
              <h2 className="head-2 text-tertiary text-center" id="exampleModalToggleLabel">
                  Status Response 
                </h2>
                  <div id="divErrorBody">
                    <div className="table-responsive w-100">
                      <table className="table table-bordered border border-disable mb-0">
                        <thead>
                          <tr className="fw-600">
                            <th className="text-center fw-600">SubmissionId</th>
                            <th className="text-center">ReportNumber</th>
                            <th className="text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td className="text-center">{response.SubmissionId}</td>
                              <td className="text-center">{response.ReportNumber}</td>
                              <td className="text-center">{response.ReportStatus}</td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              <button
                  type="button"
                  className="d-flex align-items-center justify-content-center rounded-circle bg-disable position-absolute  cursor-pointer glow-360deg modal-closebtn border-tertiary"
                  onClick={closeModal}
                >
                  X
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BOIRStatus


