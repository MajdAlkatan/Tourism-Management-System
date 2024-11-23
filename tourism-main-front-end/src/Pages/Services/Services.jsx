import "./Services.css";
import Head2 from "../../Components/Head/Head2";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import image from '../../assets/services.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DeleteCategory, DeleteTag, ServicesPage } from "./ServicesSlice";
import { TagsPage } from "./ServicesSlice";
const Services = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Store the selected category ID

  const toggleDropdown = (categoryId) => {
    setSelectedCategoryId(categoryId); // Update the selected category ID
    setShowDropdown(true);
  };
 
  const Data=useSelector(state=>state.services.servicesData.results)
  const Tags=useSelector(state=>state.services.tagsData.results)

const dispatch=useDispatch();
useEffect(() => {
  dispatch(ServicesPage());

  dispatch(TagsPage());
}, [dispatch]);
const handleDelete = (event) => {
  const categoryId = event.target.dataset.id;

  // Confirm deletion
  if (window.confirm("Are you sure you want to delete this category?")) {
    dispatch(DeleteCategory(categoryId));
  }
};
const handleDeleteTag = (event) => {
  // Ensure we're using currentTarget to get the correct id
  const tagId = event.currentTarget.dataset.id;

  // Log the tagId to debug
  console.log("Deleting tag with ID:", tagId);

  // Confirm deletion
  if (window.confirm(`Are you sure you want to delete tag with ID ${tagId}?`)) {
    dispatch(DeleteTag(tagId));
  }
};



  const navigate = useNavigate();
  const goToAddCategory = () => {
    navigate("/add_category");
  };
  const goToAddTag = () => {
    navigate("/add_tag");
  };
  return (
    <div className="hh">
      <div>
      <Head2
        image={image}
        Title="Services Dashboard"
        subTitle="Here’s what’s going on at your business right now"
        titleButton1="Add category"
        titleButton2="Add Tag"
        onClickNavigation2={goToAddTag}
        onClickNavigation={goToAddCategory}
      />
</div>
<div className="l">
        {Data && Data.map((category) => (
          <div className="j" key={category.id} >
            <div className="portfolio_services">
            <span onClick={() => toggleDropdown(category.id)}>{category.name}</span>
            <span>{category.type}</span>
            <div className="buttons">
              <button className="button-delete" data-id={category.id} onClick={handleDelete}>Delete</button>
            </div>
            </div>
            {showDropdown && selectedCategoryId === category.id && (
              Tags.filter(tag => tag.category === selectedCategoryId).map((tag) => (
                <ul key={tag.id} className="category-dropdown">
                  <li><span>{tag.name}</span></li>
                  <li><span>{tag.contenttype}</span></li>
                  <div className="icons">
                    <FontAwesomeIcon className="delete" data-id={tag.id} icon={faTrashCan} onClick={handleDeleteTag}/>
                  </div>
                </ul>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
