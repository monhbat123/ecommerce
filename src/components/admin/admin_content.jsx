import { Switch, Route } from "react-router-dom";
import {
  AdminAboutUs,
  AdminBrand,
  AdminCategory,
  AdminContact,
  AdminNews,
  AdminProduct,
  AdminSubCategory,
  AdminHome,
} from "@/components/admin";
import { NotFoundPage } from "@/main";
function AdminContent() {
  return (
    <div className="content_container">
      <Switch>
        <Route path="/admin/home" component={AdminHome} />
        <Route path="/admin/about-us" component={AdminAboutUs} />
        <Route path="/admin/brand" component={AdminBrand} />
        <Route path="/admin/category" component={AdminCategory} />
        <Route path="/admin/contact" component={AdminContact} />
        <Route path="/admin/news" component={AdminNews} />
        <Route path="/admin/product" component={AdminProduct} />
        <Route path="/admin/sub-category" component={AdminSubCategory} />
        <Route path="/admin/" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default AdminContent;
