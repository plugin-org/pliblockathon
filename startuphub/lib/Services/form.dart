import 'package:flutter/cupertino.dart';
import 'dart:collection';

// ignore: camel_case_types
class form {
  late int id;
  late String title;
  late String description;
  form(
      {required this.id, required this.title, required this.description});
}

/*class formd extends ChangeNotifier {
  List<form> startup = [
    form(
        startupname: "StartupHub",
        description: "The new startup to inovate various technologies")
  ];
  List<form> jobs = [
    form(
        startupname: "StartupHub",
        description: "We need professionals in flutter and XDC network.")
  ];
  UnmodifiableListView<form> get startups {
    return UnmodifiableListView(startup);
  }

  int get startupCount {
    return startup.length;
  }

  void addStartupContainer(String startupname, String description) {
    final f = form(startupname: startupname, description: description);
    startup.add(f);
  }

  void addJobContainer(String starupname, String jobdescription) {
    final f = form(startupname: starupname, description: jobdescription);
    jobs.add(f);
  }
}*/
