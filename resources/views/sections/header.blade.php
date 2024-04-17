<nav class="navbar p-0 fixed-top d-flex flex-row">
    <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center pe-4">
        <a class="navbar-brand brand-logo-mini text-decoration-none text-info" href="#">جدول کلمات</a>
    </div>
    <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
{{--                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">--}}
{{--                  <span class="mdi mdi-menu"></span>--}}
{{--                </button>--}}
                <ul class="navbar-nav w-100">
{{--                    <li class="nav-item w-100">--}}
{{--                        <form class="nav-link mt-2 mt-md-0 d-none d-lg-flex search">--}}
{{--                            <input type="text" class="form-control" placeholder="جست و جو">--}}
{{--                        </form>--}}
{{--                    </li>--}}
                </ul>
        <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item dropdown d-none d-lg-block">
                    <a class="nav-link btn bg-primary bg-gradient bg-opacity-50 create-new-button" id="createbuttonDropdown"
                       data-bs-toggle="dropdown" aria-expanded="false" href="#">دسترسی سریع +</a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                         aria-labelledby="createbuttonDropdown">
                            <a href="{{route('tables.create')}}" class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-dark rounded-circle">
                                        <i class="mdi mdi-file-outline text-primary"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <p class="preview-subject ellipsis mb-1">ایجاد جدول</p>
                                </div>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="{{route('index')}}" class="dropdown-item preview-item">
                                <div class="preview-thumbnail">
                                    <div class="preview-icon bg-dark rounded-circle">
                                        <i class="mdi mdi-file-outline text-primary"></i>
                                    </div>
                                </div>
                                <div class="preview-item-content">
                                    <p class="preview-subject ellipsis mb-1">مشاهده جدول ها</p>
                                </div>
                            </a>
                    </div>
                </li>
            <li class="nav-item dropdown">
                @if(\Illuminate\Support\Facades\Auth::check())
                <a class="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                    <div class="navbar-profile">
                        <img class="img-xs rounded-circle"
                             src="{{asset('auth/images/pic-4.png')}}" alt="">
                        <p class="mb-0 d-none d-sm-block navbar-profile-name pe-2">{{auth()->user()->name}}</p>
                        <i class="mdi mdi-menu-down d-none d-sm-block"></i>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                     aria-labelledby="profileDropdown">
                    <form action="{{route('logout')}}" method="post">
                        @csrf
                        <div class="dropdown-item preview-item">
                            <div class="preview-thumbnail">
                                <div class="preview-icon bg-dark rounded-circle">
                                    <i class="mdi mdi-logout text-danger"></i>
                                </div>
                            </div>
                            <div class="preview-item-content">
                                <button type="submit" class="btn btn-link text-decoration-none w-100 text-white preview-subject mb-1">
                                    خروج
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                @endif

            </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                data-toggle="offcanvas">
            <span class="mdi mdi-format-line-spacing"></span>
        </button>
    </div>
</nav>
