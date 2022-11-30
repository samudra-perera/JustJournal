import React from "react";

const EditProfileModal = (props) => {
  const { firstName, lastName } = props;
  return (
    <div className="App">

{/* modal start */}
       <div
        id="small_modal"
        className="modal fade"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content shadow-max">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel1">
                Modal title
              </h3>
              <button
                type="button"
                className="close icon"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  document.getElementById('small_modal').style.display = 'none';
                  document.getElementById('small_modal').style.opacity = 0;
      
              }}
              >
                close
              </button>
            </div>
            <div className="modal-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-lg btn-link"
                data-dismiss="modal"
                onClick={() => {
                  document.getElementById('small_modal').style.display = 'none';
                  document.getElementById('small_modal').style.opacity = 0;
      
              }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-lg btn-primary"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

{/* modal end */}
     <button
        type="button"
        className="btn btn-lg btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#small_modal"
        onClick={() => {
            document.getElementById('small_modal').style.display = 'block';
            document.getElementById('small_modal').style.opacity = 1;

        }}
          
      >
        Small modal
      </button>
    </div>
  );
};

export default EditProfileModal;
