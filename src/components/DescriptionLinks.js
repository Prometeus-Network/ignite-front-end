import React from "react";
import {inject} from "mobx-react";
import {Routes} from "../routes";
import {StaticPageLinks} from './StaticPageLinks';

const _DescriptionLinks= ({routerStore}) => {

  const Prometeus = "{Prometeus}"

  const links = {
    termsOfService : "Terms of Service",
    privacyPolicy: "Privacy Policy"
  }
  


  return (
    <div className="description-links" >
      <div>
        <p>Settings</p>
        <p>&bull;</p>
        <p>
          <StaticPageLinks 
              targetView={Routes.terms}
              routerStore={routerStore}
              linkTekst={links.termsOfService}
            />
        </p>
        <p>
          <StaticPageLinks 
            targetView={Routes.terms}
            routerStore={routerStore}
            linkTekst={links.privacyPolicy}
          />
        </p>
        <p>&bull;</p>
        <p>Help Center</p>
        <p>Logout</p>
      </div>
      <div><p>© 2020 {Prometeus} Team</p></div>
    </div>
  )
}

const mapMobxToProps = ({store}) => ({
  routerStore: store
});

export const DescriptionLinks = inject(mapMobxToProps)(_DescriptionLinks);
