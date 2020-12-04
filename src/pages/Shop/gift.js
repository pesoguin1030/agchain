import React from "react";
import { useParams } from "react-router-dom";
function GiftMaker(prop) {
  return (
    <form
      class="js-step-form"
      data-hs-step-form-options='{
        "progressSelector": "#verticalStepFormProgress",
        "stepsSelector": "#verticalStepFormContent"
      }'
    >
      <div class="row">
        <div class="col-lg-4">
          <ul id="verticalStepFormProgress" class="js-step-progress step">
            <li class="step-item">
              <div class="step-content-wrapper align-items-center">
                <span class="step-icon step-icon-soft-primary">1</span>
                <div class="step-content">
                  <h4 class="mb-0">General info</h4>
                </div>
              </div>
            </li>

            <li class="step-item">
              <div class="step-content-wrapper align-items-center">
                <span class="step-icon step-icon-soft-primary">2</span>
                <div class="step-content">
                  <h4 class="mb-0">Billing address</h4>
                </div>
              </div>
            </li>

            <li class="step-item">
              <div class="step-content-wrapper align-items-center">
                <span class="step-icon step-icon-soft-primary">3</span>
                <div class="step-content">
                  <h4 class="mb-0">Payment</h4>
                </div>
              </div>
            </li>

            <li class="step-item">
              <div class="step-content-wrapper align-items-center">
                <span class="step-icon step-icon-soft-primary">4</span>
                <div class="step-content">
                  <h4 class="mb-0">Confirmation</h4>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="col-lg-8">
          <div id="verticalStepFormContent" class="h-100 border rounded p-4">
            <div id="verticalSelectStepOne" class="active">
              Select One content goes here
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-sm btn-primary transition-3d-hover mr-1"
                  data-hs-step-form-next-options='{
                      "targetSelector": "#verticalSelectStepTwo"
                    }'
                >
                  Next
                </button>
              </div>
            </div>

            <div id="verticalSelectStepTwo" style="display: none;">
              Select Two content goes here
              <div class="d-flex justify-content-end">
                <a
                  class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1"
                  href="javascript:;"
                  data-hs-step-form-prev-options='{
                 "targetSelector": "#verticalSelectStepOne"
               }'
                >
                  Back
                </a>
                <button
                  type="button"
                  class="btn btn-sm btn-primary transition-3d-hover"
                  data-hs-step-form-next-options='{
                      "targetSelector": "#verticalSelectStepThree"
                    }'
                >
                  Next
                </button>
              </div>
            </div>

            <div id="verticalSelectStepThree" style="display: none;">
              Select Three content goes here
              <div class="d-flex justify-content-end">
                <a
                  class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1"
                  href="javascript:;"
                  data-hs-step-form-prev-options='{
                 "targetSelector": "#verticalSelectStepTwo"
               }'
                >
                  Back
                </a>
                <button
                  type="button"
                  class="btn btn-sm btn-primary transition-3d-hover"
                  data-hs-step-form-next-options='{
                      "targetSelector": "#verticalSelectStepFour"
                    }'
                >
                  Next
                </button>
              </div>
            </div>

            <div id="verticalSelectStepFour" style="display: none;">
              Select Four content goes here
              <div class="d-flex justify-content-end">
                <a
                  class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1"
                  href="javascript:;"
                  data-hs-step-form-prev-options='{
                 "targetSelector": "#verticalSelectStepThree"
               }'
                >
                  Back
                </a>
                <button
                  type="button"
                  class="btn btn-sm btn-primary transition-3d-hover"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default GiftMaker;
