import Button from "react-bootstrap/Button";

const ContainerRigntSideBar = () => {
  function removeContainer() {
    // document.querySelector('.focussedd').remove();
    if (document.querySelector(".focussedd").classList.contains("dropp")) {
      if (document.querySelector(".focussedd").hasChildNodes()) {
        const childLength =
          document.querySelector(".focussedd").children.length;
        for (let i = 0; i < childLength; i++) {
          document.querySelector(".focussedd").firstElementChild.remove();
        }
      }
    } else {
      document.querySelector(".focussedd").remove();
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <Button
        variant="primary"
        onClick={removeContainer}
        className="remove_container text-center mt-5"
      >
        Remove Container
      </Button>
    </div>
  );
};

export default ContainerRigntSideBar;
