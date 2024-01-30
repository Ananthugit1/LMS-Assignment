package com.app.LMS.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "branch")
public class branchentity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long Cid;
    @Column
    private int Sid;
    @Column
    private String Sname;
    @Column
    private String Cname;
    @Column
    private String Branchadd;
    @Column
    private String Contact;
	public Long getCid() {
		return Cid;
	}
	public void setCid(Long cid) {
		Cid = cid;
	}
	public int getSid() {
		return Sid;
	}
	public void setSid(int sid) {
		Sid = sid;
	}
	public String getSname() {
		return Sname;
	}
	public void setSname(String sname) {
		Sname = sname;
	}
	public String getCname() {
		return Cname;
	}
	public void setCname(String cname) {
		Cname = cname;
	}
	public String getBranchadd() {
		return Branchadd;
	}
	public void setBranchadd(String branchadd) {
		Branchadd = branchadd;
	}
	public String getContact() {
		return Contact;
	}
	public void setContact(String contact) {
		Contact = contact;
	}
	@Override
	public String toString() {
		return "branchentity [Cid=" + Cid + ", Sid=" + Sid + ", Sname=" + Sname + ", Cname=" + Cname + ", Branchadd="
				+ Branchadd + ", Contact=" + Contact + "]";
	}
	public branchentity(Long cid, int sid, String sname, String cname, String branchadd, String contact) {
		super();
		Cid = cid;
		Sid = sid;
		Sname = sname;
		Cname = cname;
		Branchadd = branchadd;
		Contact = contact;
	}
	public branchentity() {
		super();
		// TODO Auto-generated constructor stub
	}

    // Getter and Setter methods
    // Other fields as needed

   
}
