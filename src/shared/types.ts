export enum SelectedPage {
  Home = "home",
  SectionOne = "sectionone", //tour-list
  SectionTwo = "sectiontwo", //about
  SectionThree = "sectionthree", //testimonials
  ContactUs = "contactus",
  RouteOne = "routeone",
  RouteTwo = "routetwo",
}

export interface BenefitType {
  icon: JSX.Element
  title: string
  description: string
}

export interface ClassType {
  name: string
  description?: string
  image: string
}
