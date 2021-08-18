import { Switch, Route } from "react-router-dom";
import {
  AdminAboutUs,
  AdminBrand,
  AdminCategory,
  AdminContact,
  AdminNews,
  AdminProduct,
  AdminSubCategory,
} from "@/components/admin";
function AdminContent() {
  return (
    <div className="content_container">
      <Switch>
        <Route path="/admin/about-us" component={AdminAboutUs} />
        <Route path="/admin/brand" component={AdminBrand} />
        <Route path="/admin/category" component={AdminCategory} />
        <Route path="/admin/contact" component={AdminContact} />
        <Route path="/admin/news" component={AdminNews} />
        <Route path="/admin/product" component={AdminProduct} />
        <Route path="/admin/sub-category" component={AdminSubCategory} />
      </Switch>
    </div>
  );
}

export default AdminContent;
