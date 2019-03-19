/**
 * @module rx-jupyter
 */
// Vendor modules
import { ImmutableNotebook } from "@nteract/commutable";
import { Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import urljoin from "url-join";

// Local modules
import { createAJAXSettings, ServerConfig } from "./base";

const formURI = (path: string) => urljoin("/api/bookstore/", path);

// `Bookstore` Data Model. For more info, see:
// https://jupyter-notebook.readthedocs.io/en/stable/extending/contents.html#data-model
interface BookstoreDataModel {
  name: string;
  path: string;
  type: "notebook";
  created: string;
  last_modified: string;
  content: ImmutableNotebook;
  mimetype: string;
  format: "json";
}

/**
 * Creates an AjaxObservable for publishing content to `Bookstore`
 * https://github.com/nteract/bookstore
 *
 * @param serverConfig The server configuration
 * @param path The path to the content
 * @param model The data to send in the server request
 *
 * @returns An Observable with the request response
 */
export function publish(
  serverConfig: ServerConfig,
  path: string,
  model: BookstoreDataModel
): Observable<AjaxResponse> {
  return ajax(
    createAJAXSettings(serverConfig, formURI(path), {
      body: model,
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
  );
}
