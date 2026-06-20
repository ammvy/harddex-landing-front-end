import { useState, useMemo } from "react";
import { PHONES } from "../_data/phones";
import { LAPTOPS } from "../_data/laptops";
import { buildPhoneRows, buildLaptopRows } from "../_data/spec-builders";
export function useCompare() {
  const [category, setCategory] = useState("phone");
  const [detail, setDetail] = useState("mid");
  const [profile, setProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [pickerA, setPickerA] = useState(false);
  const [pickerB, setPickerB] = useState(false);
  const [aPhone, setAPhone] = useState(PHONES[0]);
  const [bPhone, setBPhone] = useState(PHONES[1]);
  const [aLaptop, setALaptop] = useState(LAPTOPS[0]);
  const [bLaptop, setBLaptop] = useState(LAPTOPS[1]);
  const devices = category === "phone" ? PHONES : LAPTOPS;
  const a = category === "phone" ? aPhone : aLaptop;
  const b = category === "phone" ? bPhone : bLaptop;
  const setA = d => {
    if (category === "phone") {
      setAPhone(d);
    } else {
      setALaptop(d);
    }
  };
  const setB = d => {
    if (category === "phone") {
      setBPhone(d);
    } else {
      setBLaptop(d);
    }
  };
  const sections = useMemo(() => {
    return category === "phone" ? buildPhoneRows(a, b) : buildLaptopRows(a, b);
  }, [a, b, category]);
  return {
    category,
    setCategory,
    detail,
    setDetail,
    profile,
    setProfile,
    profileOpen,
    setProfileOpen,
    pickerA,
    setPickerA,
    pickerB,
    setPickerB,
    devices,
    a,
    b,
    setA,
    setB,
    sections
  };
}