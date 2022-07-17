import Vue from 'vue'
import { Button } from 'element-ui'

Vue.use(Button)

import { Message } from 'element-ui'
Vue.prototype.$message = Message



import { Form } from 'element-ui'
Vue.use(Form)
import { FormItem } from 'element-ui'
Vue.use(FormItem)
import { Input } from 'element-ui'
Vue.use(Input)
import { TabPane,Tabs,Container,Header,Main,Footer,Aside,
    Step,Steps,Link,Checkbox,CheckboxGroup,Table,TableColumn,Select,Option,
    RadioGroup,RadioButton,Menu,Submenu,MenuItemGroup,MenuItem,Dropdown,DropdownItem,
    DropdownMenu,Breadcrumb,BreadcrumbItem,Card,Row,Col,Pagination,MessageBox,
    Dialog,Transfer,Radio} from 'element-ui'
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Link)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.prototype.$confirm=MessageBox.confirm
Vue.use(Dialog)
Vue.use(Transfer)
Vue.use(Radio)