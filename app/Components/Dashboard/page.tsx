"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Dashboard = () => {
  const [userName, setUserName] = useState<any>("");
  const [blog, setBlog] = useState<any>({
    title: "",
    description: "",
    user_id: localStorage.getItem("user_id"),
    user_name: localStorage.getItem("user_name"),
  });
  const [allBlogs, setAllBlogs] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<any>({});
  React.useEffect(() => {
    const userName = localStorage.getItem("user_name");
    setUserName(userName);
    getData();
  }, []);
  const getData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/blog",
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        const tempArr: any = [];
        response.data.data.map((item: any, index: any) => {
          if (item.user_id == localStorage.getItem("user_id")) {
            tempArr.push(item);
          }
        });
        setAllBlogs(tempArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e: any) => {
    console.log("asdasda");
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const submit = () => {
    if (blog.title && blog.description) {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/blog",
        headers: {
          "Content-Type": "application/json",
        },
        data: blog,
      };

      axios
        .request(config)
        .then((response) => {
          toast("Blog Published", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          getData();
          setBlog({
            title: "",
            description: "",
            user_id: localStorage.getItem("user_id"),
            user_name: localStorage.getItem("user_name"),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleDelete = (item: any) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/blog/${item._id}`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        toast("Blog Deleted", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        toast(error, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    setAllBlogs([]);
    setTimeout(() => {
      getData();
    }, 1000);
  };
  const handleEdit = (item: any) => {
    setShowModal(true);
    setEditingBlog(item);
  };
  const handleEditing = (e: any) => {
    setEditingBlog({ ...editingBlog, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/blog/${editingBlog._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: editingBlog,
    };

    axios
      .request(config)
      .then((response) => {
        toast("Blog Updated", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowModal(false);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-black text-white flex justify-between p-2">
        <h2 className="text-2xl">Personal Blog Website</h2>
        <nav>
          <ul className="flex space-x-2 text-lg">
            <Link
              href="/Components/Profile"
              style={{
                textDecoration: "none",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              <li>{userName}</li>
            </Link>
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <li>Logout</li>
            </Link>
          </ul>
        </nav>
      </header>
      <div className="h-20 bg-slate-100 text-dark text-3xl font-semibold ps-5 flex items-center">
        <h1>Dashboard</h1>
      </div>
      <div className="ms-20 p-5 flex flex-col items-start justify-center w-2/3 bg-white">
        <div className="px-5 flex flex-col items-center justify-center w-full">
          <input
            className="border-2 outline-2 rounded px-2 mb-1 w-full"
            style={{ height: "40px" }}
            placeholder="Title"
            value={blog.title}
            onChange={(e) => handleChange(e)}
            name="title"
          />
          <textarea
            className="border-2 outline-2 rounded px-2 mb-1 w-full"
            rows={4}
            placeholder="What's on your mind."
            value={blog.description}
            onChange={(e) => handleChange(e)}
            name="description"
          />
        </div>
        <button
          className="ms-5 rounded bg-black p-2 text-white justify-self-start"
          style={{ width: 150 }}
          onClick={submit}
        >
          Publish blog
        </button>
      </div>
      <br />
      <div className="ms-20 p-5 flex flex-col items-start justify-center w-2/3 bg-white">
        <h2 className="text-2xl font-semibold mb-5">My Blogs</h2>
        {allBlogs?.map((item: any, index: any) => {
          return (
            <div className="mb-4" key={index}>
              <div>
                <h3 className="text-md font-bold">{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Button>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="border-2 outline-2 rounded px-2 mb-1 w-full"
            style={{ height: "40px" }}
            placeholder="Title"
            value={editingBlog.title}
            onChange={(e) => handleEditing(e)}
            name="title"
          />
          <textarea
            className="border-2 outline-2 rounded px-2 mb-1 w-full"
            rows={4}
            placeholder="What's on your mind."
            value={editingBlog.description}
            onChange={(e) => handleEditing(e)}
            name="description"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} variant="secondary">
            Close
          </Button>
          <Button onClick={handleEditSave} variant="dark">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
