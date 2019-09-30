import React, { Component } from "react";
import { Table, Modal } from "react-bootstrap";
import "../../../css/MainContainer/UpperMainContainer/JobsInfoTable/index.css";
import Pagination from "react-js-pagination";
import { IoIosClose } from "react-icons/io";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { ITEMS_COUNT_PER_PAGE } from "../../../Variables";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
// import axios from "../../../../Util/axios";
import * as SidebarJobsAction from "../../../redux/action/sidebarJobsAction";
class PendingReviews extends Component {
  state = {
    reviews: null,
    review: null,
    activePage: 1,
    job: null,
    show: false,
    visibleReviews: null
  };
  modalClose = () => {
    return this.setState({ show: false });
  };

  modalOpen = () => {
    return this.setState({ show: true });
  };

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.country !== this.props.country) {
  //       this.props.fillIsFetching(true);
  //       axios
  //         .get(
  //           `/organization/reviews/${this.props.country.name}/${this.state.activePage}`,
  //           {
  //             headers: {
  //               Authorization: `bearer ${this.props.adminLogin.loginToken}`
  //             }
  //           }
  //         )
  //         .then(res => {
  //           let reviews =
  //             res.data.reviews &&
  //             res.data.reviews
  //               .map(RS =>
  //                 RS.review.reviews.map(R => ({
  //                   ...R,
  //                   cId: RS._id,
  //                   cName: RS.legalName
  //                 }))
  //               )
  //               .flat();

  //           this.setState({ reviews });
  //           this.props.fillIsFetching(false);
  //         });
  //     }
  //   }

  async componentDidMount() {
    this.props.fillIsFetching(true);
    console.log(this.props.isFetching);

    let getdata = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "kiran", status: "pending" },
            { id: 2, name: "Rahul", status: "pending" },
            { id: 3, name: "Mustafa", status: "pending" },
            { id: 4, name: "Anurag", status: "pending" }
          ]);
        }, 2000);
      });
    };

    // let setData = data => {
    //   return new Promise((resolve, reject) => {
    //     resolve(
    //       console.log(data);
    //       this.setState({ reviews: data });
    //       this.props.fillIsFetching(false);
    //     );
    //   });
    // };

    getdata().then(result => {
      this.setState({ reviews: result });
      this.props.fillIsFetching(false);
      console.log(result, this.props.isFetching);
    });

    // axios
    //   .get(
    //     `/organization/reviews/${this.props.country.name}/${this.state.activePage}`,
    //     {
    //       headers: {
    //         Authorization: `bearer ${this.props.adminLogin.loginToken}`
    //       }
    //     }
    //   )
    //   .then(res => {
    //     let reviews =
    //       res.data.reviews &&
    //       res.data.reviews
    //         .map(RS =>
    //           RS.review.reviews.map(R => ({
    //             ...R,
    //             cId: RS._id,
    //             cName: RS.legalName
    //           }))
    //         )
    //         .flat();

    //     this.setState({ reviews });
    //     this.props.fillIsFetching(false);
    //   });
  }

  onRowClick = async id => {
    this.state.reviews.forEach(r => {
      if (r.id === id) {
        this.setState({ review: r });
      }
    });
    this.modalOpen();
  };

  onAccept = id => {
    let Accepted = this.state.reviews.filter(r => r.id !== id);
    this.setState({
      reviews: Accepted
    });
  };

  onReject = id => {
    let Accepted = this.state.reviews.filter(r => r.id !== id);
    this.setState({
      reviews: Accepted
    });
  };

  onDelete = id => {
    let Accepted = this.state.reviews.filter(r => r.id !== id);
    this.setState({
      reviews: Accepted
    });
  };

  // handlePageChange = pageNumber => {
  //   this.setState({ activePage: pageNumber }, async () => {
  //     var res = await Axios.get(
  //       `http://192.168.0.158:3002/api/admin/jobSeekers/all/${
  //         this.state.activePage
  //       }`,
  // { headers: { Authorization: `bearer ${this.props.adminLogin.loginToken}` } }
  //     );
  //     this.setState({ jobSubscribed: res.data.result });
  //   });
  // };

  //   onInputChange = () => {
  //     const { reviews } = this.state;
  //     const newVisibleReviews = reviews.filter(e => {
  //       return JSON.stringify(e)
  //         .toLocaleLowerCase()
  //         .includes(this.refs.search.value.toLocaleLowerCase());
  //     });
  //     this.setState({ visibleReviews: newVisibleReviews });
  //   };

  //   onAccept=(id)=>{
  //       //Api call for accept
  //     let array = []

  //   }

  render() {
    // let __html = "";
    // if (this.state.review) {
    //   try {
    //     __html = stateToHTML(
    //       convertFromRaw(JSON.parse(this.state.review.description))
    //     );
    //   } catch (e) {
    //     __html = this.state.review.description;
    //   }
    // }

    return (
      <div>
        {!!this.state.reviews ? (
          <div className="jobs-info-table">
            <input
              ref="search"
              class="form-control form-control-lg"
              type="text"
              placeholder="Search Reviews"
              onChange={this.onInputChange}
              style={{ margin: "1rem 0", borderRadius: "0" }}
            />

            <Table
              className="table-striped"
              style={{ background: "#f5f5f5" }}
              responsive
              hover
            >
              <thead>
                <tr>
                  <th className="th-title">Name</th>
                  <th>Status</th>
                  {/* <th>Average Rating</th> */}
                  {/* <th>Submitted By</th>
                  <th>Posted At</th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.reviews &&
                  this.state.reviews.map((r, i) => {
                    return (
                      <tr
                        key={i}
                        onClick={() => this.onRowClick(r.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{r.name}</td>
                        <td>{r.status}</td>
                      </tr>
                    );
                  })}

                {/* {this.state.visibleReviews
                  ? this.state.visibleReviews.map((review, i) => {
                      return (
                        <tr
                          key={i}
                          onClick={() => this.onRowClick(review._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{review.cName}</td>
                          <td>{review.reviewTitle}</td>
                          <td>
                            <div className="star-review">
                              <StarRatings
                                rating={
                                  (review.workRating +
                                    review.benefitsRating +
                                    review.cultureRating) /
                                  3
                                }
                                starRatedColor="rgb(240, 105, 64)"
                                numberOfStars={5}
                                name="rating"
                              />
                            </div>
                          </td>
                          <td>{review.createdAt.split("T")[0]}</td>
                          <td>{review.submittedBy}</td>
                        </tr>
                      );
                    })
                  : this.state.reviews
                  ? this.state.reviews.map((review, i) => {
                      return (
                        <tr
                          key={i}
                          onClick={() => this.onRowClick(review._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{review.cName}</td>
                          <td>{review.reviewTitle}</td>
                          <td>
                            <div className="star-review">
                              <StarRatings
                                rating={
                                  (review.workRating +
                                    review.benefitsRating +
                                    review.cultureRating) /
                                  3
                                }
                                starRatedColor="rgb(240, 105, 64)"
                                numberOfStars={5}
                                name="rating"
                              />
                            </div>
                          </td>
                          <td>{review.createdAt.split("T")[0]}</td>
                          <td>{review.submittedBy}</td>
                        </tr>
                      );
                    })
                  : null} */}
              </tbody>
            </Table>

            <Modal show={this.state.show}>
              <Modal.Header className="modal-header">
                <Modal.Title className="modal-title">
                  {" "}
                  {this.state.review && this.state.review.id ? (
                    <div style={{ color: "rgb(240, 105, 64)" }}>
                      {this.state.review.name}
                    </div>
                  ) : (
                    ""
                  )}{" "}
                </Modal.Title>
                <div>
                  <button className="modal-btn" onClick={this.modalClose}>
                    <IoIosClose />
                  </button>
                </div>
              </Modal.Header>

              <Modal.Body>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.onAccept(this.state.review.id)}
                >
                  accept
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => this.onReject(this.state.review.id)}
                >
                  reject
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.onDelete(this.state.review.id)}
                >
                  delete
                </button>
              </Modal.Body>
            </Modal>

            {/* {this.state.jobsCount &&
              this.state.jobsCount / ITEMS_COUNT_PER_PAGE > 1 && (
                <div className="text-center">
                  <Pagination
                    className="pagination"
                    pageRangeDisplayed={5}
                    activePage={this.state.activePage}
                    itemsCountPerPage={ITEMS_COUNT_PER_PAGE}
                    totalItemsCount={
                      this.state.jobsCount && this.state.jobsCount
                    }
                    onChange={this.handlePageChange}
                  />
                </div>
              )}
            <Modal show={this.state.show}>
              <Modal.Header className="modal-header">
                <Modal.Title className="modal-title">
                  {" "}
                  {this.state.review && this.state.review._id ? (
                    <div style={{ color: "rgb(240, 105, 64)" }}>
                      {this.state.review.reviewTitle}
                    </div>
                  ) : (
                    ""
                  )}{" "}
                </Modal.Title>
                <div>
                  <button className="modal-btn" onClick={this.modalClose}>
                    <IoIosClose />
                  </button>
                </div>
              </Modal.Header>

              <Modal.Body>
                {this.state.review && this.state.review._id ? (
                  <div>
                    <div>
                      <div className="job-info-header">
                        <div>
                          <strong>Employment Status : </strong>
                          {this.state.review &&
                          this.state.review.employmentStatus ? (
                            <span>{this.state.review.employmentStatus}</span>
                          ) : (
                            <span>Status not available</span>
                          )}
                        </div>
                        <div className="job-status">
                          <div>
                            <strong>Employment Type : </strong>
                            {this.state.review.employerType &&
                              this.state.review.employerType}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        {this.state.review && this.state.review._id ? (
                          <div>
                            <strong>Review Id :</strong> {this.state.review._id}
                          </div>
                        ) : (
                          ""
                        )}
                        <div>
                          <strong>Created At :</strong>{" "}
                          {this.state.review.createdAt.split("T")[0]}
                        </div>
                      </div>
                    </div>
                    <hr className="hrow" />

                    <div className="job-info-details">
                      <div>
                        <h2>Review Details</h2>
                      </div>

                      <div>
                        <table>
                          <tr>
                            <td>
                              <strong>Work Rating :</strong>
                            </td>
                            <td>
                              <div className="star-review">
                                <StarRatings
                                  rating={this.state.review.workRating}
                                  starRatedColor="rgb(240, 105, 64)"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {" "}
                              <strong>Benefits Rating :</strong>
                            </td>
                            <td>
                              <div className="star-review">
                                <StarRatings
                                  rating={this.state.review.benefitsRating}
                                  starRatedColor="rgb(240, 105, 64)"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Culture Rating :</strong>
                            </td>
                            <td>
                              <div className="star-review">
                                <StarRatings
                                  rating={this.state.review.cultureRating}
                                  starRatedColor="rgb(240, 105, 64)"
                                  numberOfStars={5}
                                  name="rating"
                                />
                              </div>
                            </td>
                          </tr>
                        </table>

                        <div style={{ padding: "0.5rem 0" }}>
                          {" "}
                          <strong>Submitted By :</strong>{" "}
                          {this.state.review.submittedBy}
                        </div>
                        <div style={{ padding: "0.5rem 0" }}>
                          {" "}
                          <strong>Pros :</strong>{" "}
                          <div>{this.state.review.pros}</div>
                        </div>
                        <div style={{ padding: "0.5rem 0" }}>
                          {" "}
                          <strong>Cons :</strong>{" "}
                          <div>{this.state.review.cons}</div>
                        </div>
                        <strong style={{ padding: "0.5rem 0" }}>
                          Description
                        </strong>
                        <div
                          dangerouslySetInnerHTML={
                            this.state.review.description
                              ? {
                                  __html: __html
                                }
                              : { __html: "" }
                          }
                        />
                        <div><button className="reviews-validation-btn" onClick={()=>this.onAccept(this.state.review._id)}>Accept</button>
                        <button className="reviews-validation-btn" onClick={()=>this.onReject(this.state.review._id)}>Reject</button></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1> No Reviews Found</h1>
                  </div>
                )}
              </Modal.Body>
            </Modal> */}
          </div>
        ) : (
          <div
            className="loading_img"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "4rem 0"
            }}
          >
            <img
              width="auto"
              height="200px"
              src={require("../../../img/jobs_Search.png")}
              alt="loding_img"
            />
            <br />
            {this.props.isFetching ? (
              <h4>Searching Reviews</h4>
            ) : (
              <h4>No Reviews found for this search</h4>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    country: state.sidebarJobsData.country,
    adminLogin: state.sidebarJobsData.adminLogin,
    isFetching: state.sidebarJobsData.isFetching
  };
};

export default connect(
  mapStateToProps,
  SidebarJobsAction
)(PendingReviews);
